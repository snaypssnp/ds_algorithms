const Node = require('./node');
const colors = require('./const/colors');

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    const newNode = Node.create(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      let node = this.root;
      let parent = null;

      while (!Node.isNil(node)) {
        parent = node;

        if (key < node.key) {
          node = node.left;
          continue;
        }

        if (key > node.key) {
          node = node.right;
        }
      }

      newNode.parent = parent;

      if (key < parent.key) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }

    this._insertionBalance(newNode);
  }

  _insertionBalance(node) {
    this._insertCase1(node);
  }

  _insertCase1(node) { // if node is root element
    if (Node.isNil(node.parent)) {
      node.color = colors.BLACK;
    } else {
      this._insertCase2(node);
    }
  }

  _insertCase2(node) {
    if (Node.isBlack(node.parent)) {
      return;
    }

    this._insertCase3(node);
  }

  _insertCase3(node) {
    const uncle = node.getUncle();

    if (!Node.isNil(uncle) && Node.isRed(uncle)) {
      const grandParent = node.getGrandParent();

      node.parent.color = colors.BLACK;
      uncle.color = colors.BLACK;

      grandParent.color = colors.RED;

      this._insertCase1(grandParent);
    } else {
      this._insertCase4(node);
    }
  }

  _insertCase4(node) {
    const grandParent = node.getGrandParent();

    if (node === node.parent.right && node.parent === grandParent.left) {
      this._rotateLeft(node.parent);

      node = node.left;
    } else if (node === node.parent.left && node.parent === grandParent.right) {
      this._rotateRight(node.parent);

      node = node.right;
    }

    this._insertCase5(node);
  }

  _insertCase5(node) {
    const grandParent = node.getGrandParent();

    node.parent.color = colors.BLACK;
    grandParent.color = colors.RED;

    if (node === node.parent.left && node.parent === grandParent.left) {
      this._rotateRight(grandParent);
    } else {
      this._rotateLeft(grandParent);
    }
  }

  _rotateLeft(node) {
    const pivot = node.right;

    pivot.parent = node.parent;

    if (!Node.isNil(node.parent)) {
      if (node.parent.left === node) {
        node.parent.left = pivot;
      } else {
        node.parent.right = pivot;
      }
    } else {
      this.root = pivot;
    }

    node.right = pivot.left;

    if (!Node.isNil(pivot.left)) {
      pivot.left.parent = node;
    }

    node.parent = pivot;

    pivot.left = node;
  }

  _rotateRight(node) {
    const pivot = node.left;

    pivot.parent = node.parent;

    if (!Node.isNil(node.parent)) {
      if (node.parent.left === node) {
        node.parent.left = pivot;
      } else {
        node.parent.right = pivot;
      }
    } else {
      this.root = pivot;
    }

    node.left = pivot.right;

    if (!Node.isNil(pivot.right)) {
      pivot.right.parent = node;
    }

    node.parent = pivot;

    pivot.right = node;
  }

  _minNode(node) {
    if (Node.isNil(node)) {
      return null;
    }

    while(!Node.isNil(node.left)) {
      node = node.left;
    }

    return node;
  }

  min() {
    const node = this._minNode(this.root);

    return node && node.key;
  }

  _maxNode(node) {
    if (Node.isNil(node)) {
      return null;
    }

    while(!Node.isNil(node.right)) {
      node = node.right;
    }

    return node;
  }

  max() {
    const node = this._maxNode(this.root);

    return node && node.key;
  }

  search(key) {
    let node = this.root;
    while(!Node.isNil(node)) {
      if (key < node.key) {
        node = node.left;
        continue;
      }

      if (key > node.key) {
        node = node.right;
        continue;
      }

      return node;
    }

    return null;
  }

  _replaceNode(node, child) {
    child.parent = node.parent;

    if (node.parent === null) {
      this.root = child;
    } if (node.parent.left === node) {
      node.parent.left = child;
    } else {
      node.parent.right = child;
    }
  }

  delete(key) {
    const node = this.search(key);

    if (Node.isNil(node)) {
      return;
    }

    if (!Node.isNil(node.left) && !Node.isNil(node.right)) {
      const nodeLeftMax = this._maxNode(node.left);

      node.key = nodeLeftMax.key;
      node.value = nodeLeftMax.value;

      return this._deletionBalance(nodeLeftMax);
    }

    return this._deletionBalance(node);
  }

  _deletionBalance(node) {
    const child = Node.isNil(node.left) ? node.right : node.left;

    this._replaceNode(node, child);

    if (Node.isBlack(node)) {
      if (Node.isRed(child)) {
        child.color = colors.BLACK;
      } else {
        this._deleteCase1(child);
      }
    }
  }

  _deleteCase1(node) {

  }
}

module.exports = RedBlackTree;
