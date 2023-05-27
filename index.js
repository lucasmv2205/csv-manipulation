// Array original com os dados dos votos
const votes = [
  { id: 1, legislator_id: 10, vote_id: 1001, vote_type: 1 },
  { id: 2, legislator_id: 20, vote_id: 1002, vote_type: 2 },
  { id: 3, legislator_id: 30, vote_id: 1003, vote_type: 1 },
  { id: 4, legislator_id: 40, vote_id: 1004, vote_type: 2 },
  { id: 5, legislator_id: 50, vote_id: 1005, vote_type: 1 },
  { id: 6, legislator_id: 10, vote_id: 1006, vote_type: 2 },
  { id: 7, legislator_id: 20, vote_id: 1007, vote_type: 1 },
  { id: 8, legislator_id: 30, vote_id: 1008, vote_type: 2 },
  { id: 9, legislator_id: 40, vote_id: 1009, vote_type: 1 },
  { id: 10, legislator_id: 50, vote_id: 1010, vote_type: 2 },
];

// Array de legislators
const legislators = [
  { id: 10, name: "Legislator A" },
  { id: 20, name: "Legislator B" },
  { id: 30, name: "Legislator C" },
  { id: 40, name: "Legislator D" },
  { id: 50, name: "Legislator E" },
];

// Função para filtrar os votos por legislator_id e calcular o total de votos suportados e opostos
function filterVotesByLegislatorId(legislatorId) {
  const filteredVotes = votes.filter(
    (vote) => vote.legislator_id === legislatorId
  );
  const num_supported_bills = filteredVotes.filter(
    (vote) => vote.vote_type === 1
  ).length;
  const num_opposed_bills = filteredVotes.filter(
    (vote) => vote.vote_type === 2
  ).length;
  return { num_supported_bills, num_opposed_bills };
}

// Nova estrutura com os legislators e informações dos votos
const newStructure = legislators.map((legislator) => {
  const { id, name } = legislator;
  const { num_supported_bills, num_opposed_bills } =
    filterVotesByLegislatorId(id);

  return {
    id,
    name,
    num_supported_bills,
    num_opposed_bills,
  };
});

console.log(newStructure);
