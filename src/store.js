export const initialStore = () => {
  return {
    contactos: [] 
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_contactos':
      return {
        ...store,
        contactos: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
