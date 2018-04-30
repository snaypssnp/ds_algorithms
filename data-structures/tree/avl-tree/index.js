const Node = require('./node');

class AvlTree {
  constructor() {
    this._root = null;
  }

  _rotateLeft(node) {
    const tmp = node.right;

    node.right = tmp.left;
    tmp.left = node;

    node.setHeight();
    tmp.setHeight();

    return tmp;
  }

  _rotateRight(node) {
    const tmp = node.left;

    node.left = tmp.right;
    tmp.right = node;

    node.setHeight();
    tmp.setHeight();

    return tmp;
  }

  _balance(node) {
    if (node === null) {
      return null;
    }

    if (node.bfactor() === -2) {
      if (node.right.bfactor() === 1) {
        node.right = this._rotateRight(node.right);
      }
      return this._rotateLeft(node);
    }

    if (node.bfactor() === 2) {
      if (node.left.bfactor() === -1) {
        node.left = this._rotateLeft(node.left);
      }
      return this._rotateRight(node);
    }

    return node;
  }

  _insertNode(node, key) {
    if (node === null) {
      return new Node(key);
    }

    if (key < node.key) {
      node.left = this._insertNode(node.left, key);
    } else if (key > node.key) {
      node.right = this._insertNode(node.right, key);
    }

    node.setHeight();

    return this._balance(node);
  }

  insert(key) {
    this._root = this._insertNode(this._root, key);
  }


  _deleteNode(node, key) {
    if (!node) {
      return null;
    }

    if (key < node.key) {
      node.left = this._deleteNode(node.left, key);
    } else if (key > node.key) {
      node.right = this._deleteNode(node.right, key);
    } else if (node.left === null && node.right === null) { // leaf
      node = null;
    } else if (node.left === null) {
      node = node.right;
    } else if (node.right === null) {
      node = node.left;
    } else {
      const minRightKey = this._minNode(node.right);

      node.key = minRightKey;
      node.right = this._deleteNode(node.right, minRightKey);
    }

    return this._balance(node);
  }

  delete(key) {
    this._root = this._deleteNode(this._root, key);
  }

  print() {
    console.log(JSON.stringify(this._root, null, 2));
  }
}

module.exports = AvlTree;
