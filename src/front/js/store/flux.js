const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			contactListUrl: "https://playground.4geeks.com/contact/agendas",
			swUrl: "https://swapi.tech/api/",
			slug: "Andrea",
			contactos: [],
			currentContact: null,
			personajes: [],
			vehiculos: [],
			planets: [],
			species: [],
			currentPersonaje: {},
		},
		actions: {
			getPersonajes: async () => {
                const url = getStore().swUrl + "/people"
				const options = {
					method: "GET",
					"Content-Type": "application/json" 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)
				}
				const data = await response.json()
				console.log(data.results)
				setStore({personajes: data.results})
			},
			getVehiculos: async () => {
                const url = getStore().swUrl + "/vehicles"
				const options = {
					method: "GET",
					"Content-Type": "application/json" 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)
				}
				const data = await response.json()
				console.log(data.results)
				setStore({vehiculos: data.results})
			},
			getSpecies: async () => {
                const url = getStore().swUrl + "/species"
				const options = {
					method: "GET",
					"Content-Type": "application/json" 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)
				}
				const data = await response.json()
				console.log(data.results)
				setStore({species: data.results})
			},
			getPlanets: async () => {
                const url = getStore().swUrl + "/planets"
				const options = {
					method: "GET",
					"Content-Type": "application/json" 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)
				}
				const data = await response.json()
				console.log(data.results)
				setStore({planets: data.results})
			},
			getDetailPeople: async (characterid) => {
                const url = `${process.env.URISTART}/api/people/${characterid}`
				const options = {
					method: "GET", 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)
				}
				const data = await response.json()
				console.log(data.results)
				setStore({currentPersonaje: data.results})
			},
			getContacts: async () => {
                const url = getStore().contactListUrl + "/" + getStore().slug
				const options = {
					method: "GET",
					"Content-Type": "application/json" 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)

				}
				const data = await response.json()
				setStore({contactos: data.contacts})
				
			},
			deleteContact: async (id) => {
                const url = getStore().contactListUrl + "/" + getStore().slug + "/contacts/" + id
				const options = {
					method: "DELETE",
					"Content-Type": "application/json" 
				}

				const response = await fetch(url, options)
				if (!response.ok) {
					console.error("Hay un error", response.status, response.statusText)
					console.error(url, options)

				}			
			},

			editarContacto: async (id, name, email, phone, address) => {
				const uri = getStore().contactListUrl + "/" + getStore().slug + "/contacts/" + id
				const dataToSend = { 
					"name": name,
					"email": email,
					"phone": phone,
					"adress": address,

				};
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					  },
					body: JSON.stringify(dataToSend)

				}
				const response = await fetch(uri, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				console.log(dataToSend)
				console.log(response)
			},
			crearContacto: async (contactos) => {
				const uri = getStore().contactListUrl + "/" + getStore().slug + "/contacts/"
				const dataToSend = contactos;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					  },
					body: JSON.stringify(dataToSend)

				}
				const response = await fetch(uri, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return
				}				
			},
			
			
			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			setCurrentContact: (contact) => { setStore({ currentContact: contact }) },
			
		}
	};
};

export default getState;
