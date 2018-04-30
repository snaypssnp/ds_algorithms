const Node = require('./node');

class BinarySearchTree {
  constructor() {
    this._root = null;
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

    return node;
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

      return node;
    }

    if (key > node.key) {
      node.right = this._deleteNode(node.right, key);

      return node;
    }

    if (node.left === null && node.right === null) { // leaf
      return null;
    }

    if (node.left === null) {
      return node.right;
    }

    if (node.right === null) {
      return node.left;
    }

    const minRightKey = this._minNode(node.right);

    node.key = minRightKey;
    node.right = this._deleteNode(node.right, minRightKey);

    return node;
  }

  delete(key) {
    this._root = this._deleteNode(this._root, key);
  }

  _inOrderNode(node, cb) {
    if (node === null) {
      return;
    }

    this._inOrderNode(node.left, cb);
    cb(node.key);
    this._inOrderNode(node.right, cb);
  }

  inOrder(cb) {
    this._inOrderNode(this._root, cb);
  }

  _preOrderNode(node, cb) {
    if (node === null) {
      return;
    }

    cb(node.key);
    this._preOrderNode(node.left, cb);
    this._preOrderNode(node.right, cb);
  }

  preOrder(cb) {
    this._preOrderNode(this._root, cb);
  }

  _postOrderNode(node, cb) {
    if (node === null) {
      return;
    }

    this._postOrderNode(node.left, cb);
    this._postOrderNode(node.right, cb);
    cb(node.key);
  }

  postOrder(cb) {
    this._postOrderNode(this._root, cb);
  }

  _minNode(node) {
    while (node.left !== null) {
      node = node.left;
    }

    return node.key;
  }

  min() {
    if (this._root === null) {
      return;
    }

    return this._minNode(this._root);
  }

  _maxNode(node) {
    while (node.right !== null) {
      node = node.right;
    }

    return node.key;
  }

  max() {
    if (this._root === null) {
      return;
    }

    return this._maxNode(this._root);
  }

  _searchNode(node, key) {
    if (node === null) {
      return false;
    }

    if (key < node.key) {
      return this._searchNode(node.left, key);
    }

    if (key > node.key) {
      return this._searchNode(node.right, key);
    }

    return true;
  }

  search(key) {
    return this._searchNode(this._root, key);
  }

  print() {
    console.log(this._root);
  }
}

module.exports = BinarySearchTree;
