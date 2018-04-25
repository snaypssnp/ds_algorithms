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

  static create(key, value) {
    const node = new Node(key, value);

    node.color = colors.RED;

    return node;
  }

  static isNil(node) {
    return node === null;
  }

  static isRed(node) {
    return node !== null && node.color === colors.RED;
  }

  static isBlack(node) {
    return node === null || node.color === colors.BLACK;
  }
};

module.exports = Node;
