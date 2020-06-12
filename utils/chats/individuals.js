let individuals = [];

function individualJoin(id, username, chatId) {
    const individual = { id, username, chatId }

    individuals.push(individual);

    return individual;
}

function getCurrentIndividual(id) {
    return individuals.find(individual => individual.id === id);
}

function individualLeave(id) {
    const index = individuals.findIndex(individual => individual.id === id);

    const individual = individuals.splice(index, 1);
    return individual[0];
}

function getchatMembers(chatId) {
    return individuals.filter(individual => individual.chatId === chatId);
}

module.exports = {
    individualJoin,
    getCurrentIndividual,
    individualLeave,
    getchatMembers
}