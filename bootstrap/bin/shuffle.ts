const shuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const strings = ["apple", "banana", "cherry", "date", "elderberry"];
const users = [ { name: "John", surname: "Doe" }, { name: "Jane", surname: "Doe" }];

const shuffledArray = shuffle(strings);
const shuffledObjects = shuffle(users);

console.log(shuffledArray);
console.log(shuffledObjects);