const people = [
  {
    id: "1",
    name: "Charlie",
    job: "Janitor",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
  {
    id: "2",
    name: "Mac",
    job: "Bouncer",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
  {
    id: "3",
    name: "Dee",
    job: "Aspring actress",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
  {
    id: "4",
    name: "Dennis",
    job: "Bartender",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
  {
    id: "5",
    name: "Bob",
    job: "Teacher",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
  {
    id: "6",
    name: "Mary",
    job: "Social Worker",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
  {
    id: "7",
    name: "Jim",
    job: "Waiter",
    description:
      "Lorem ipsum dolor sit amet, diam dicant populo nec ne, vix option ceteros facilisi ei. Id per omnis ipsum, harum tation noluisse no eum. No eos legimus menandri voluptaria, at prima audire eleifend pri. Eos agam posse ne. Ad natum everti vidisse mea. Ei etiam tincidunt nam, quem moderatius neglegentur vel in.",
  },
];
export function getPeople() {
  return people;
}
export function getPerson(id) {
  return people.find((p) => p.id === id);
}
