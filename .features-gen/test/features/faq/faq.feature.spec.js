// Generated from: test\features\faq\faq.feature
import { test } from "../../../../test/fixtures/fixture.ts";

test.describe('FAQ Section and UI verification', () => {

  test.beforeEach('Background', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('I visit the homepage', null, { homePage }); 
  });
  
  test('Verify the FAQ section header and description', { tag: ['@homePage_UI', '@validation'] }, async ({ Then, And, homePage }) => { 
    await Then('I should see the FAQ section with the header "Frequently"', null, { homePage }); 
    await And('I should see the description containing "Have any questions or doubts about choosing the right pair of glasses or contact lenses?"', null, { homePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('test\\features\\faq\\faq.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":7,"tags":["@homePage_UI","@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I visit the homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the FAQ section with the header \"Frequently\"","stepMatchArguments":[{"group":{"start":45,"value":"\"Frequently\"","children":[{"start":46,"value":"Frequently","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see the description containing \"Have any questions or doubts about choosing the right pair of glasses or contact lenses?\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Have any questions or doubts about choosing the right pair of glasses or contact lenses?\"","children":[{"start":41,"value":"Have any questions or doubts about choosing the right pair of glasses or contact lenses?","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end