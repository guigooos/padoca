class Category {
  constructor(id, name, description, icon) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.active = true;
    this.createdAt = new Date();
    this.productCount = 0;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      active: this.active,
      createdAt: this.createdAt,
      productCount: this.productCount,
    };
  }

  update(newData) {
    if (newData.name) this.name = newData.name;
    if (newData.description) this.description = newData.description;
    if (newData.icon) this.icon = newData.icon;
    if (newData.active !== undefined) this.active = newData.active;
  }

  addProduct() {
    this.productCount++;
  }

  removeProduct() {
    if (this.productCount > 0) {
      this.productCount--;
    }
  }
}

module.exports = Category;