async function testGenerate() {
  let sentence = await generate();
  let words = sentence.split(' ');
  assert(words.length >= 2, 'generate should return a sentence with at least two words');
  console.log(`Test case: generate should return a sentence with at least two words`);
  console.log(`Sentence: ${sentence}`);
  console.log(`Number of words: ${words.length}`);
  
  words.slice(0, -1).forEach(word => {
    assert(adjectives.includes(word), 'Each word except the last in the sentence should be an adjective');
    console.log(`Test case: Each word except the last in the sentence should be an adjective`);
    console.log(`Adjective: ${word}`);
  });
  
  assert(animals.includes(words[words.length - 1]), 'The last word in the sentence should be an animal');
  console.log(`Test case: The last word in the sentence should be an animal`);
  console.log(`Animal: ${words[words.length - 1]}`);
}