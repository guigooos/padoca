const fs = require('fs').promises;
const path = require('path');

class Logger {
  constructor(filename = 'system.log') {
    this.logPath = path.join(__dirname, '..', 'logs', filename);
    this.ensureLogDirectory();
  }

  // Garantir que o diretório de logs existe
  async ensureLogDirectory() {
    try {
      const logDir = path.dirname(this.logPath);
      await fs.mkdir(logDir, { recursive: true });
    } catch (error) {
      console.error('❌ Erro ao criar diretório de logs:', error.message);
    }
  }

  // Registrar log
  async log(level, message, data = null) {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = { timestamp, level: level.toUpperCase(), message, data };

      // Salva no arquivo
      const logLine = JSON.stringify(logEntry) + '\n';
      await fs.appendFile(this.logPath, logLine);

      // Exibe no console
      const emoji = this.getEmojiForLevel(level);
      console.log(`${emoji} [${timestamp}] ${level.toUpperCase()}: ${message}`);

    } catch (error) {
      console.error('❌ Erro ao escrever log:', error.message);
    }
  }

  // Emojis para níveis de log
  getEmojiForLevel(level) {
    const emojis = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      debug: '🐛',
    };
    return emojis[level.toLowerCase()] || '📌';
  }

  // Métodos de conveniência
  async info(message, data = null) {
    await this.log('info', message, data);
  }

  async success(message, data = null) {
    await this.log('success', message, data);
  }

  async warning(message, data = null) {
    await this.log('warning', message, data);
  }

  async error(message, data = null) {
    await this.log('error', message, data);
  }

  async debug(message, data = null) {
    await this.log('debug', message, data);
  }


// Ler logs
    async readLogs(lines = 50) {
        try {
            const content = await fs.readFile(this.logPath, 'utf8');
            const logLines = content.trim().split('\n');
            return logLines.slice(-lines).map(line => {
                try {
                    return JSON.parse(line);
                } catch {
                    return { message: line };
                }
            });
        } catch (error) {
            console.log('📂 Arquivo de log não encontrado');
            return [];
        }
    }
}
module.exports = Logger;

