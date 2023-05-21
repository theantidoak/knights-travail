// ChatGPT made this. 
// I couldn't get the buildTree to work. 
// I tried using recursion based on Binary Search Trees.
// Queues to the rescue.

class Node {
  constructor(coords, distance) {
    this.data = coords;
    this.distance = distance;
    this.children = [];
  }
}

class Tree {
  constructor(start, target) {
    this.root = new Node(start, 0);
    this.target = target;
  }

  buildTree() {
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node.data[0] === this.target[0] && node.data[1] === this.target[1]) {
        return node.distance;
      }

      const legalMoves = this.findLegalMoves(node.data);

      for (const move of legalMoves) {
        const childNode = new Node(move, node.distance + 1);
        node.children.push(childNode);
        queue.push(childNode);
      }
    }

    return -1;
  }

  findLegalMoves(coords) {
    const moves = [
      [1, 2], [1, -2], [-1, 2], [-1, -2],
      [2, 1], [2, -1], [-2, 1], [-2, -1]
    ];

    const legalMoves = [];

    for (const move of moves) {
      const newX = coords[0] + move[0];
      const newY = coords[1] + move[1];

      if (this.isValidMove(newX, newY)) {
        legalMoves.push([newX, newY]);
      }
    }

    return legalMoves;
  }

  isValidMove(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
}

const start = [2, 3];
const target = [0, 0];

const tree = new Tree(start, target);
console.log(`Minimum number of moves: ${tree.buildTree()}`);