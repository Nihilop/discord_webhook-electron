const DB_NAME = 'serversdb';
const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore("servers", { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async deleteServer(server) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['servers'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('servers');
			store.delete(server.id);
		});	
	},
	async getServers() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['servers'],'readonly');
			trans.oncomplete = () => {
				resolve(servers);
			};
			
			let store = trans.objectStore('servers');
			let servers = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					servers.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveServer(server) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['servers'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('servers');
			store.put(server);

		});
	
	},
	async saveHook(hook) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['hookImage'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('hookImage');
			store.put(hook);

		});
	
	}

}