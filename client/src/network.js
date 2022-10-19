export const get = async (url) => {
    const response = await fetch('events');
    const data = await response.json();

    return data;
};

// Network examples to save for now
// useEffect(() => {
//     fetch("/events").then(
//       response => response.json()
//     ).then(
//       data => {
//         setNetwork(data);
//       }
//     )
//   }, []);