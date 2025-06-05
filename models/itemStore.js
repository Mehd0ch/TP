import { v4 as uuidv4 } from 'uuid';

class ItemStore {
  #items = new Map();

  getAll() {
    return Array.from(this.#items.values());
  }

  get(id) {
    return this.#items.get(id) || null;
  }

  create(payload) {
    const id = uuidv4();
    const item = { id, ...payload };
    this.#items.set(id, item);
    return item;
  }

  update(id, payload) {
    if (!this.#items.has(id)) return null;
    const updated = { id, ...payload };
    this.#items.set(id, updated);
    return updated;
  }

  remove(id) {
    return this.#items.delete(id);
  }
}

export default new ItemStore();
