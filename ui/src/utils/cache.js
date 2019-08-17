export default class CacheSearch {
  constructor(searchFn) {
    this.searchFn = searchFn;
    this.cache = {};
    this.cacheCount = 0;
  }

  async get(query) {
    if (this.cache[query]) { return this.cache[query]; }
    const data = await this.searchFn(query);
    this.cache[query] = data;
    this.cacheCount += 1;
    return data;
  }

  flush() {
    this.cache = {};
    this.cacheCount = 0;
  }
}