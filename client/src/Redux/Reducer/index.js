import { 
    GET_INITIAL_DATA,
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    GET_DOG_DETAIL,
    FILTER_DOG_NAME,
    UPDATE_FILTER,
    SORT_DOGS,
    } from "../Actions/index";

    export const originFilterValues = {
      ONLY_ORIGINAL_ORIGIN: {
        name: 'Only original breeds',
        type: 'origin',
        value: undefined,
        enableDeleteFilterButton: true,
      },
      ONLY_CREATED_ORIGIN: {
        name: 'Only new created breeds',
        type: 'origin',
        value: undefined,
        enableDeleteFilterButton: true,
      },
      ALL_ORIGIN: {
        name: 'All origins',
        default: true,
        type: 'origin',
        enableDeleteFilterButton: false,
      }
    }

  export const temperamentFilterValues = {
    TEMPERAMENT_NAME: {
      name: 'Filter by Temperament',
      type: 'temperament',
      value: undefined,
      enableDeleteFilterButton: true,
    },
    ALL_TEMPERAMENTS: {
      name: 'All temperaments',
      default: true,
      type: 'breed',
      enableDeleteFilterButton: false
    }
  }

    export const breedFilterValues = {
      BREED_NAME: {
        name: 'Filter by Name',
        type: 'breed',
        value: undefined,
        enableDeleteFilterButton: false,
      },
      ALL_BREEDS: {
        name: 'All breed names',
        type: 'breed',
        default: true,
        enableDeleteFilterButton: false
      }
    }

    export const availableSorts = {
      breed_a_z: {
        name: 'Breed A-Z',
        value: 'breed_a_z',
        field: 'name'
      },
      breed_z_a: {
        name: 'Breed Z-A',
        value: 'breed_z_a',
        field: 'name'
      },
      weight_min: {
        name: 'Lower Weight',
        value: 'weight_min',
        field: 'weight_min'
      },
      weight_max: {
        name: 'Higher Weight',
        value: 'weight_max',
        field: 'weight_max'
      }
    }

    const initialState = {
      dogs: [],
      temperaments: [],
      allDogs: [],
      dogsByName: [],
      dogDetail: [],
      availableFilters: {
        origin: originFilterValues,
        temperament: temperamentFilterValues,
        breed: breedFilterValues
      },
      activeFilters: [],
      activeBreedFilter: null,
      activeOriginFilter: null,
      activeTemperamentFilters: [],
      activeSort: availableSorts.breed_a_z,
      availableSorts: Object.values(availableSorts)
    }

    function sortAlphabeticalField( data = [], fieldName = 'name', direction = 'A-Z') {
      return data.sort((a,b) => {
        if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) return direction === 'A-Z' ? 1 : -1;
        if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) return direction === 'A-Z' ? -1 : 1;
        return 0;
      })
    }

    function sortDogs(state, payload) {
      switch(payload.value) {
        case availableSorts.breed_a_z.value:
          return {
            ...state,
            activeSort: availableSorts.breed_a_z,
            dogs: sortAlphabeticalField([...state.dogs])
          }
        case availableSorts.breed_z_a.value:
          return {
            ...state,
            activeSort: availableSorts.breed_z_a,
            dogs: sortAlphabeticalField([...state.dogs], 'name', 'Z-A')
          }
        case availableSorts.weight_max.value:
          return {
            ...state,
            activeSort: availableSorts.weight_max,
            dogs: [...state.dogs].sort((a, b) => {
              if(a.weight_min < b.weight_min) return 1;
              if(a.weight_min > b.weight_min) return -1; 
              return 0;
             })
          }
        case availableSorts.weight_min.value:
          return {
            ...state,
            activeSort: availableSorts.weight_min,
            dogs: [...state.dogs].sort((a, b) => {
              if(a.weight_min < b.weight_min) return -1;
              if(a.weight_min > b.weight_min) return 1; 
              return 0;
              })
          }
          
      }

    }

    function filterAndSort(state) {
      state.dogs = state.activeBreedFilter ? [...state.dogsByName] : [...state.allDogs]
      state.availableTemperaments = [...state.temperaments]
      const availableTemperamentsDictionary = [...state.temperaments].reduce((acc, item) => (
        {
          ...acc, 
          [item.name]: item
        }
      ), {})
      if(state.activeOriginFilter) {
        state.dogs = state.activeOriginFilter.name === originFilterValues.ONLY_CREATED_ORIGIN.name ? state.dogs.filter(d => !d.externalId) : state.dogs.filter(d => d.externalId)
      }
      if(state.activeTemperamentFilters.length > 0) {
        
        state.dogs = state.activeTemperamentFilters
        .reduce( (acc, temperament) => {
          delete availableTemperamentsDictionary[temperament.name]
          return acc.filter(
            dog => dog.Temperaments
            .map(item => item.name)
            .includes(temperament.value))
          }, 
          state.dogs)
      }
      state.availableTemperaments = sortAlphabeticalField(Object.values(availableTemperamentsDictionary))

      return sortDogs(state, state.activeSort)
    }

    function filterBreedDogs(state, payload) {
      if(!payload.filterValue) {
        return filterAndSort({...state, activeBreedFilter: null})
      }
      if(!payload?.dogs.length) {
        return filterAndSort({...state, dogsByName: [...payload.dogs], activeBreedFilter: {...breedFilterValues.BREED_NAME, name: payload.filterValue}})
      }
      return filterAndSort({...state, dogsByName: [...payload.dogs], activeBreedFilter:  {...breedFilterValues.BREED_NAME, name: payload.filterValue}})
    }

    function filterOriginDogs(state, payload) {
      if(payload.value === undefined) {
        return filterAndSort({...state, activeOriginFilter: null})
      }
      return filterAndSort({...state, activeOriginFilter: payload})
    }

    function filterTemperamentDogs(state, payload) {
      if(payload.default === true) {
        return filterAndSort({...state, activeTemperamentFilters: []})
      }
      if(payload.actionType === 'ADD') {
        return filterAndSort({...state, activeTemperamentFilters: [...state.activeTemperamentFilters, payload]})
      }
      return filterAndSort({...state, activeTemperamentFilters: [...state.activeTemperamentFilters].filter(item => item.name !== payload.value)})
    }

    function updateFilterDogs(state, payload) {

      switch(payload.type) {
        case 'origin':
          return filterOriginDogs(state, payload)
        case 'temperament':
          return filterTemperamentDogs(state, payload)
        default:
          return filterBreedDogs(state, payload)
      }
    }

    function rootReducer (state = initialState, action) {
    
      switch(action.type) {

          case GET_INITIAL_DATA:
            const temperaments = sortAlphabeticalField(action.payload.temperamentsData)
            return{
              ...state,
              dogs: sortAlphabeticalField(action.payload.dogsData),
              allDogs: action.payload.dogsData,
              temperaments: temperaments,
              availableTemperaments: temperaments,
              activeBreedFilter: null, // el filtro vacio indica que debe ir la etiqueta 'All breeds'
              activeOriginFilter: null, // el filtro vacio indica que debe ir la etiqueta 'All origins'
              activeTemperamentFilters: [], // el filtro vacio indica que debe ir la etiqueta 'All temperaments'
              activeSort: availableSorts.breed_a_z
          };
        
          case GET_ALL_DOGS:
            return{
              ...state,
              dogs: action.payload,
              allDogs: action.payload,
          };
          
          case FILTER_DOG_NAME:
            return {
              ...state,
              ...updateFilterDogs(state, action.payload)
            };
            
          case GET_DOG_DETAIL:
            return {
              ...state,
              dogDetail: action.payload
              };
        
          case GET_ALL_TEMPERAMENTS:
            return {
              ...state,
              temperaments: action.payload
            };

          
            case UPDATE_FILTER:
              return {
                ...state,
                ...updateFilterDogs(state, action.payload)
              };

            case SORT_DOGS:
              // implementar funcion de sortDOgs
              return sortDogs(state, action.payload)
     
          default:
            return state;
      }
    };
      
      export default rootReducer;