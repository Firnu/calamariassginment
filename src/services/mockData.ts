import { Doctor } from "./doctorApi.types";

const names: string[] = [
    "Patricia Hill", "Carolyn Moore", "Jane Anderson", "Annie Simmons", "Irene Allen", "Julie Alexander", "Lori Diaz", "Phyllis Baker", "Nancy Collins", "Lillian Barnes", "Tammy Sanchez", "Cheryl Ramirez", "Julia Morgan", "Joan Gonzalez", "Amy Perez", "Margaret Mitchell", "Rachel Reed", "Susan Rogers", "Melissa King", "Lisa Taylor", "Anna Carter", "Wanda Roberts", "Paula Clark", "Kathryn Robinson", "Michelle Peterson", "Theresa White", "Sara Harris", "Stephanie Brooks", "Emily Bailey", "Christine Bryant", "Ruth Nelson", "Christina Martinez", "Judith Jenkins", "Kelly Cook", "Betty Washington", "Marie Ross", "Alice Jackson", "Rose Sanders", "Kathleen Johnson", "Ashley Lopez", "Helen Gray", "Pamela Patterson", "Dorothy Henderson", "Barbara Wood", "Sarah Russell", "Kimberly Jones", "Ann Rodriguez", "Elizabeth James", "Amanda Lee", "Heather Brown", "Donna Thomas", "Gloria Campbell", "Virginia Gonzales", "Beverly Howard", "Doris Martin", "Linda Hall", "Katherine Lewis", "Denise Miller", "Norma Walker", "Anne Wright", "Diane Young", "Carol Ward", "Andrea Torres", "Brenda Smith", "Judy Kelly", "Louise Bell", "Kathy Parker", "Maria Long", "Rebecca Powell", "Cynthia Foster", "Karen Turner", "Joyce Richardson", "Janet Evans", "Jacqueline Garcia", "Frances Hernandez", "Mildred Adams", "Diana Price", "Deborah Butler", "Catherine Hughes", "Martha Murphy", "Sharon Griffin", "Laura Thompson", "Marilyn Edwards", "Shirley Stewart", "Jessica Coleman", "Angela Williams", "Mary Morris", "Evelyn Watson", "Janice Cooper", "Ruby Phillips", "Nicole Perry", "Sandra Cox", "Lois Wilson", "Jean Bennett", "Teresa Green", "Tina Flores", "Jennifer Rivera", "Debra Davis", "Bonnie Scott",
    "Michael Ward", "Christopher Morgan", "Douglas Brooks", "John Simmons", "Jack Rodriguez", "Samuel Roberts", "Ronald King", "Jesse Thomas", "Daniel James", "Eric Wilson", "Johnny Bennett", "Scott Henderson", "Walter Butler", "Jose Jenkins", "Patrick Long", "Carlos Alexander", "Donald Russell", "Dennis Bell", "Stephen Allen", "Raymond Diaz", "Harold Taylor", "Anthony Price", "Keith Carter", "Gary Young", "Steven White", "Nicholas Jackson", "Gregory Perez", "Roger Ramirez", "Ernest Hughes", "Peter Griffin", "Shawn Anderson", "Paul Collins", "Howard Turner", "Timothy Torres", "Aaron Barnes", "Robert Johnson", "Charles Gonzales", "Adam Scott", "Craig Stewart", "Mark Clark", "Steve Bailey", "Jeffrey Watson", "Sean Nelson", "Billy Harris", "Jason Gray", "George Davis", "Arthur Miller", "Frank Walker", "Edward Lopez", "Andrew Thompson", "Henry Phillips", "Juan Hall", "Ryan Jones", "Jerry Reed", "Larry Powell", "Willie Martin", "Chris Perry", "Albert Cooper", "Philip Green", "Benjamin Brown", "Harry Martinez", "Carl Ross", "Martin Robinson", "Eugene Campbell", "Todd Lee", "Thomas Baker", "Roy Foster", "Gerald Sanders", "Bobby Smith", "Randy Peterson", "Brian Coleman", "Ralph Gonzalez", "Phillip Wood", "Terry Richardson", "Jonathan Williams", "Fred Kelly", "Jimmy Edwards", "William Hernandez", "Jeremy Parker", "Richard Flores", "Joseph Rivera", "Louis Murphy", "David Hill", "Earl Morris", "Kevin Mitchell", "Russell Evans", "Brandon Cox", "Joshua Garcia", "Lawrence Bryant", "Clarence Moore", "Joe Howard", "James Washington", "Bruce Adams", "Alan Wright", "Matthew Patterson", "Victor Cook", "Wayne Lewis", "Kenneth Rogers", "Justin Sanchez"
];

const firstNames = names.map(q => q.split(" ")[0]);
const lastNames = names.map(q => q.split(" ")[1]);

const specializations: string[] = [
    "Gynecologist",
    "Cardiologist",
    "Dermatologist",
    "Gastroenterologist",
    "Oncologist",
    "Pediatrician",
    "Psychiatrist",
    "Endocrinologist",
    "Neurologist",
    "Ophthalmologist",
    "Physician",
    "Radiologists",
    "Allergist",
    "Nephrologist",
    "Otolaryngologist",
    "Geriatrician",
    "Pulmonologist",
    "Internist"
]

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const avatarChance = 0.5;
const hasRatingChance = 0.7;
const beingAlreadyFavoriteChance = 0.005;

function generateRandomDoctor(index: number): Doctor {
    const hasAvatar = Math.random() < avatarChance;

    let avatar: string | null = null;
    if (hasAvatar) {
        avatar = `https://robohash.org/${getRandomInt(999999)}.png?set=set4`;
    }

    const name = firstNames[getRandomInt(names.length - 1)];
    const lastName = lastNames[getRandomInt(names.length - 1)];

    const fullName = name + " " + lastName;
    const hasRatings = Math.random() < hasRatingChance;

    let ratingCount = 0;
    let ratingSum = 0;

    if (hasRatings) {
        ratingCount = getRandomInt(150)
        ratingSum = ((Math.random() * 4) + 1) * ratingCount;
    }

    return {
        id: index,
        avatarSrc: avatar,
        name: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1],
        specialization: specializations[getRandomInt(specializations.length - 1)],
        userRating: null,
        ratingSum: ratingSum,
        ratingCount: ratingCount,
        isFavorite: Math.random() < beingAlreadyFavoriteChance,
    }
}

export function generatePeople(howMany: number): Doctor[] {
    const doctors: Doctor[] = [];
    for (let i = 0; i < howMany; i++) {
        doctors.push(generateRandomDoctor(i));
    }

    return doctors;
}