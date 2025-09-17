const fs = require('fs').promises;
const path = require('path');

class FileHelper {
  static async readJSON(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌Robô:"Ops! Não consegui ler este arquivo:"', error);
      return null;
    }
  }

  static async writeJSON(filePath, data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonData, 'utf8');
      return true;
    } catch (error) {
      console.error('❌Robô:"Ops! Não consegui salvar este arquivo:"', error);
      return false;
    }
  }

  static async ensureDirectory(dirPath) {
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return true;
    } catch (error) {
      console.error('❌Robô:"Ops! Não consegui criar a pasta:"', error);
      return false;
    }
  }
}

module.exports = FileHelper;