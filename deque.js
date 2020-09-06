class Node {
  constructor(data = null, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(val) {
    if (!val) {
      throw new Error("Must include a value");
    }

    if (!this.head) {
      this.head = this.tail = new Node(val);
      this.head.prev = null;
      this.tail.prev = this.head;
    } else {
      this.tail.next = new Node(val);
      this.tail.next.prev = this.tail;
      this.tail = this.tail.next;
    }

    this.size += 1;
  }

  pop() {
    if (this.size === 0) {
      throw new Error("Unable to pop off empty deque");
    }

    const deletedNode = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.head.prev = this.tail;
    this.size -= 1;

    return deletedNode.data;
  }

  pushleft(val) {
    if (!val) {
      throw new Error("Must include a value");
    }

    if (!this.head) {
      this.head = this.tail = new Node(val);
      this.tail.prev = this.head;
    } else {
      const newHead = new Node(val, this.head, this.head.prev);
      this.head = newHead;
    }

    this.size += 1;
  }

  popleft() {
    if (this.size === 0) {
      throw new Error("Unable to pop off empty deque");
    }

    const deletedNode = this.head;
    this.head = this.head.next;
    this.size -= 1;
    return deletedNode.data;
  }

  print() {
    let ptr = this.head;

    while (ptr) {
      console.log(ptr.data);
      ptr = ptr.next;
    }
  }
}

const d = new Deque();

d.pushleft(5);
d.pushleft(5);
d.pushleft(12);
d.print();
console.log("---");
d.popleft();
d.print();
