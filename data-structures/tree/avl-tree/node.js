class Node {
  constructor(key) {
    this.key = key;
    this.height = 0;
    this.left = null;
    this.right = null;
  }

  setHeight() {
    this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1;
  }

  bfactor() {
    return this.getLeftHeight() - this.getRightHeight();
  }

  getLeftHeight() {
    if (!this.left) {
      return -1;
    }

    return this.left.height;
  }

  getRightHeight() {
    if (!this.right) {
      return -1;
    }

    return this.right.height;
  }
}

module.exports = Node;
