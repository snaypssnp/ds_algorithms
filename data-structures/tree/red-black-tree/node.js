'use strict';
const colors = require('./const/colors');

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = null;
    this.parent = null;
  }

  getGrandParent() {
    const {parent} = this;

    if (parent !== null) {
      return parent.parent;
    }

    return null;
  }

  getUncle() {
    const grandParent = this.getGrandParent();

    if (grandParent === null) {
      return null;
    }

    if (this.parent === grandParent.left) {
      return grandParent.right;
    }

    return grandParent.left;
  }

  static _createLeaf(node) {
    const leaf = new Node(null, null);

    leaf.color = colors.BLACK;
    leaf.parent = node;

    return leaf;
  }

  static create(key, value) {
    const node = new Node(key, value);

    node.color = colors.RED;
    node.left = this._createLeaf(node);
    node.right = this._createLeaf(node);

    return node;
  }

  static isNil(node) {
    return node === null || (node.key == null && node.value == null
      && node.color === colors.BLACK
      && node.left == null && node.right == null);
  }

  static isRed(node) {
    return node.color === colors.RED;
  }

  static isBlack(node) {
    return node.color === colors.BLACK;
  }
};

module.exports = Node;
