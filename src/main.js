import App from './App.svelte';

Neutralino.init();

window.svelte_app = new App({
	target: document.body,
	props: {
			name: 'hello world',
			NL_OS,
			NL_PORT,
			Neutralino
	}
});

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.os.setTray({
	icon: "/dev_build/icons/trayIcon.png",
	menuItems: [
			{id: "VERSION", text: "Get version"},
			{id: "SEP", text: "-"},
			{id: "QUIT", text: "Quit"}
	]
});

function onTrayMenuItemClicked(event) {
		switch(event.detail.id) {
				case "VERSION":
						Neutralino.os.showMessageBox({
								type: "INFO",
								title: "Version information",
								content: `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}` 
						});
						break;
				case "QUIT":
						Neutralino.app.exit();
						break;
		}
}


export default app;