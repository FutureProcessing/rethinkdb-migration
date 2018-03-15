const _ = require('lodash');
const EventEmiter = require('events');

class TaskRunner extends EventEmiter {
    up() {
        const sortedList = this.migrateFiles.getSortedList(this.path);
        this.migrateQueue.push(...sortedList);
        this.consumeQueue();
    }

    consumeQueue() {
        const file = _.first(this.migrateQueue);
        if (_.isUndefined(file)) {
            this.emit(this.END_EVENT);
            return;
        }
        console.info(`starting wrapping migration script ${file.name}`);

        const migrateScript = require(file.path + '/' + file.name);
        migrateScript.up(this.rethink, this);
    }

    finishMigrationScript() {
        const file = this.migrateQueue.shift();
        console.info(`finished wrapping migration script ${file.name}`);

        this.consumeQueue();
    }
}

module.exports = TaskRunner;
