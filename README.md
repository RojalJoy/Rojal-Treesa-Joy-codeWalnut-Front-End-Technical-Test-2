
---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/CW-Codewalnut/codewalnut-front-end-tech-test.git
```

### 2.My approach, along with any challenges or trade-offs I have encountered.

1. Approach & Challenges

**React with Hooks:** Used useState and useEffect for state and API calls.

useState is used to manage:

searchTerm: Stores the input from the search field.
pokemonData: Holds the fetched data for the specific Pokemon.
loading: Displays loading status while fetching data.
error: Catches and displays any errors (e.g., when a Pokemon is not found).
pokemonList: Stores the list of all Pokemon names.
showList: Toggles the visibility of the full Pokemon list.

**API Integration:** Fetched Pokemon data from PokeAPI with error handling.

**Responsive Design:** Applied media queries for mobile compatibility.

**Animations:** Added button hover effects and a typewriter effect for better UX.
    
**Challenges:** Managing large Pokemon lists efficiently (1302 items) cause the just shiwing the ntire list is hectic and also somewhat hard.There was some node error first.


