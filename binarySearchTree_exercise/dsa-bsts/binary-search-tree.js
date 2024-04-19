class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if(this.root === null){
      // if the reee is empty set new node as root
      this.root = newNode;
      // return the entire tree
      return this; 
    }

    let currNode = this.root;
    while (true) {
      // check if new value go left or right
      if (val < currNode.val){
        if (currNode.left === null) {
          // if child is null place new node here
          currNode.left = newNode;
          break;
        } 
        else {
          // move to the left child
          currNode = currNode.left;
        }
        
      }
      else if (val > currNode.val) {
        if (currNode.right === null) {
          // if right child is null place new node her
          currNode.right = newNode;
          break;
        }
        else {
          currNode = currNode.right;
        }
      }
      else {
        // if calue is equal to currNode.val do nothing
        break;
      }
    }
    return this

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (node === null) {
      // if node is null we found the spot
      const newNode = new Node(val);
      if (this.root === null) {
        // if tree is empty update the root
        this.root = newNode;
      }
      // return new node
      return this;
    }
    if (val < node.val) {
      // recursively call left child
      if (node.left === null) {
        node.left = new Node(val);
      }
      else {
        this.insertRecursively(val, node.left);
      }
    } 
    else if (val > node.val) {
      // recursively call right child
      if (node.right === null) {
        node.right = new Node(val);
      }
      else {
        this.insertRecursively(val, node.right)
      }
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    // start search at the root
    let currNode = this.root;
    while (currNode !== null) {
      // move to left child
      if (val < currNode.val) {
        currNode = currNode.left;
      }
      // move to right child
      else if (val > currNode.val) {
        currNode = currNode.right;
      }
      // found the node, return it 
      else {
        return currNode;
      }
    }
    // if value not found return undefined
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (node === null) {
      // if node is null, value is not found
      return undefined;
    }

    if (val === node.val) {
      // found node, return it
      return node;
    }
    else if (val < node.val) {
      // serach left subtree
      return this.findRecursively(val, node.left)
    }
    else {
      // search right subtree
      return this.findRecursively(val, node.right)
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // array will hold node values
    const result = [];

    const traverse = (node) => {
      // if node is null just return
      if (node === null) return;
      // visit node and process the curr node value
      result.push(node.val);
      traverse(node.left);
      traverse(node.right)
    };
    // start traversal from root
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    // array will hold node values
    const result = [];

    const traverse = (node) => {
      // if node is null just stop recursion and return
      if (node === null) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right)
    };

    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    // array to store values
    const result = [];

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    };

    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    // array will store the values
    const result = [];
    const queue = [];

    if (this.root != null) {
      // start with root in queue
      queue.push(this.root);
    }

    while (queue.length > 0) {
      // remove the front node from queue
      const currNode = queue.shift();
      // visit node and capture its value
      result.push(currNode.val);

      if (currNode.left !== null) {
        // enqueue left child
        queue.push(currNode.left);
      }

      if (currNode.right !== null) {
        // enqueue right child
        queue.push(currNode.right);
      }
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, node = this.root, parent = null) {
    // Node not found
    if (node === null) return null;

    // find the node
    if (val < node.val) {
      // go to left
      return this.remove(val, node.left, node);
    }
    else if (val > node.val) {
      // go to right
      return this.remove(val, node.right, node);
    }
    // Node found
    else {
      // node with no children
      if (node.left === null && node.right === null) {
        if (node === this.root) {
          // remove root
          this.root = null;
        }
        else if (parent.left === node) {
          // remove left child
          parent.left = null;
        }
        else {
          // remove right child
          parent.right = null;
        }
      }

      // node with one child
      else if (node.left === null) {
        if (node === this.root) {
          // replace root
          this.root = node.right;
        }
        else if (parent.left === node) {
          // replace left child
          parent.left = node.right
        }
        else {
          // replace right child
          parent.right = node.right;
        }
      }
      else if (node.right === null) {
        if (node === this.root) {
          // replace root
          this.root = node.left;
        }
        else if (parent.left === node){
          // replace left child
          parent.left = node.left;
        }
        else {
          // replace right child
          parent.right = node.right;
        }
      }
      // Node with two children
      else {
        let successor = node.right;
        let successorParent = node;
        while (successor.left !== null) {
          successorParent = successor;
          successor = successor.left;
        }
        // replace value with successor value
        node.val = successor.val;
        // remove successor
        this.remove(successor.val, successor, successorParent);
      }
    }
    // return the updated root
    return this.root;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(node = this.root) {
    // helper function to determine height of the subtree rooted at node
    // returns height if balanced and -1 if not balanced
    const getHeight = (node) => {
      // height is non-existant subtree is 0
      if (node === null) return 0;

      let leftHeight = getHeight(node.left);
      // left subtree is unbalanced
      if (leftHeight === -1) return -1;

      let rightHeight = getHeight(node.right);
      // right subtree is unbalanced
      if (rightHeight === -1) return -1;

      // check the balance condition at curr node
      if (Math.abs(leftHeight - rightHeight) > 1) {
        // curr subtree is unalanced
        return -1;
      }
      // return the height of the curr subtree
      return 1 + Math.max(leftHeight, rightHeight);
    };
    // start from the root
    return getHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (this.root.left === null && this.root.right === null)) {
      // there is either no tree or only one node
      return undefined;
    }

    let current = this.root;
    let parent = null;

    // find rightmost node
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // if rightmost node has left subtree
    if (current.left) {
      current = current.left;
      // find the rightmost node in teh left subtree
      while (current.right) {
        current = current.right;
      }
      // this is the second highest
      return current.val;
    }
    // if no let subtree, then the parent is theh second heighest
    return parent.val;
  }
}

module.exports = BinarySearchTree;
