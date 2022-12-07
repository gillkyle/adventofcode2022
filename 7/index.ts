// ------ PART ONE -------
// read the input.txt file
const input = Deno.readTextFileSync("./7/input.txt");

// PART TWO
const TOTAL_DISK_SPACE = 70000000;
const UNUSED_SPACE = 30000000;

// split the file by line
const lines = input.split(`
$ `);

type NodeType = {
  id: string;
  children: NodeType[];
  parent: NodeType | null;
  filesize: number | null;
  addChild: (child: NodeType) => void;
  getChildren: () => NodeType[];
  getParent: () => NodeType | null;
  getParentsPath: () => string[];
  setParent: (parent: NodeType) => void;
  getDirectChildrenNodes: () => NodeType[];
  getAllChildrenNodes: () => string[];
  getTotalFilesize: () => number | null;
};
function Node(this: NodeType, value: string) {
  this.id = value;
  this.children = [];
  this.parent = null;
  this.filesize = null;

  this.addChild = function (child: NodeType) {
    this.children.push(child);
  };

  this.getChildren = function () {
    return this.children;
  };

  this.getParent = function () {
    return this.parent;
  };

  this.getParentsPath = function () {
    let path = [];
    let current = this;
    while (current.parent) {
      path.unshift(current.parent.id);
      current = current.parent;
    }

    // remove the first element, which is the root node
    return path.slice(1);
  };

  this.setParent = function (parent) {
    this.parent = parent;
  };

  this.getDirectChildrenNodes = function () {
    const nodes: NodeType[] = [];
    this.children.forEach((child) => {
      nodes.push(child);
    });
    return nodes;
  };

  this.getAllChildrenNodes = function () {
    let nodes: string[] = [];
    this.children.forEach((child: NodeType) => {
      nodes.push(child.id);
      nodes = nodes.concat(child.getAllChildrenNodes());
    });
    return nodes;
  };

  this.getTotalFilesize = function () {
    let totalFilesize = 0;
    this.children.forEach((child: NodeType) => {
      if (child.filesize) {
        totalFilesize += child.filesize;
      }
      const totalChildSize = child.getTotalFilesize();
      if (totalChildSize !== null) {
        totalFilesize += totalChildSize;
      }
    });
    return totalFilesize;
  };
}

// the input file is a list of terminal output from an imagined computer
// if the line has $ cd / then we're at the top of the directory and we can set the root node in the file tree

// if the line has $ ls then we're reading a directory on the next lines

// if the line has $ cd then we're going into a new subtree of the directory

// if the line has $ cd .. then we're going back up a directory

// @ts-ignore kinda dumb
let fileTree = new Node("root");
let pointer = fileTree;
lines.forEach((line) => {
  console.log("---------- NEW LINE ----------");
  // commands can be either ls or cd
  // get first two characters to see if it's ls or cd
  const command = line.slice(0, 2);
  // if the command is ls
  if (command === "ls") {
    // split the line by \n newlines
    const lineItems = line.split(`
`);
    // go through each item
    lineItems.forEach((item) => {
      if (item === "ls") {
        // don't care about the initial ls part
      }
      console.log(item);
      // split the item by a space
      const itemParts = item.split(" ");
      // if the first part of the itemParts is "dir", we can create a new node for the directory
      if (itemParts[0] === "dir") {
        // get the directory name
        const directoryName = itemParts[1];
        // create a new node for the directory
        // @ts-ignore
        const newNode = new Node(directoryName);
        // set the parent of the new node to the current pointer
        newNode.setParent(pointer);
        // add the new node to the children of the current pointer
        pointer.addChild(newNode);
      } else {
        // we know the item is a file now, the first part is the file size, and the second part is the name of the node
        // get the file name
        const fileName = itemParts[1];
        // create a new node for the file
        // @ts-ignore
        const newNode = new Node(fileName);
        // set the filesize of the new node to the first part of the itemParts
        newNode.filesize = parseInt(itemParts[0]);
        // set the parent of the new node to the current pointer
        newNode.setParent(pointer);
        // add the new node to the children of the current pointer
        pointer.addChild(newNode);
      }
    });
  } else if (command === "cd") {
    // if the command is cd
    // get the directory name
    const directoryName = line.slice(3);
    console.log(directoryName);
    if (directoryName === "..") {
      // if the directory name is .. then we're going back up a directory
      // move the fileTree pointer to the parent
      pointer = pointer.getParent();
    } else {
      // if the directory name is anything else then we're going into a new directory
      // create a new node for the directory
      // @ts-ignore
      const newNode = new Node(directoryName);
      // set the parent of the new node to the current pointer
      newNode.setParent(pointer);
      // add the new node to the children of the current pointer
      pointer.addChild(newNode);
      // move the fileTree pointer to the new node
      pointer = newNode;
    }
  }
});
const totalStorageSize = fileTree.getTotalFilesize();
console.log(totalStorageSize);

// find all nodes with a total size of at most 100000
// const nodesWithTotalSizeAtMost100000: any = [];
// function findNodesWithTotalSizeAtMost100000(node: NodeType) {
//   const size = node.getTotalFilesize();
//   if (size !== null && size <= 100000) {
//     nodesWithTotalSizeAtMost100000.push(node);
//   }
//   node.children.forEach((child) => {
//     findNodesWithTotalSizeAtMost100000(child);
//   });
// }
// findNodesWithTotalSizeAtMost100000(fileTree);
// console.log(nodesWithTotalSizeAtMost100000);
// // list the names of all nodes with a total size of at most 100000
// // nodesWithTotalSizeAtMost100000.forEach((node: NodeType) => {
// //   console.log(node.id);
// // });
// // sum the total of all nodes with a total size of at most 100000
// let total = 0;
// nodesWithTotalSizeAtMost100000.forEach((node: NodeType) => {
//   total += node.getTotalFilesize();
// });
// console.log(total);
const minimumSizeToDelete = Math.abs(
  TOTAL_DISK_SPACE - UNUSED_SPACE - totalStorageSize
);
console.log(minimumSizeToDelete);

// find the smallest node that is at least as big as the minimum size to delete
let smallestNode: NodeType | null = null;
function findSmallestNode(node: NodeType) {
  const size = node.getTotalFilesize();
  if (size !== null && size >= minimumSizeToDelete) {
    if (smallestNode === null) {
      smallestNode = node;
      // @ts-ignore could be null meh
    } else if (size < smallestNode.getTotalFilesize()) {
      smallestNode = node;
    }
  }
  node.children.forEach((child) => {
    findSmallestNode(child);
  });
}
findSmallestNode(fileTree);
// @ts-ignore works fine again
console.log(smallestNode.getTotalFilesize());
