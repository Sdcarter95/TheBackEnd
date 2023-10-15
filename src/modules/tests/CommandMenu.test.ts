import { CommandMenu } from '../CommandMenu';


// Define a mock function for the actions that can be added to the CommandMenu.
const mockAction = jest.fn();

// Define a utility function to access private members for testing.
const testCommandMenu = (commandMenu: any) => {
    const getOptions = () => commandMenu.options;
    const getNumericOptions = () => commandMenu.numericOptions;
    const getMenuMessage = () => commandMenu.menuMessage;
    const getMenuQuestion = () => commandMenu.menuQuestion;
    const getMenuFunction = () => commandMenu.menuFunction;
  
    return {
      getOptions,
      getNumericOptions,
      getMenuMessage,
      getMenuQuestion,
      getMenuFunction,
    };
  };

describe('CommandMenu', () => {
  let commandMenu: CommandMenu;

  beforeEach(() => {
    commandMenu = new CommandMenu();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add options correctly', () => {
    const { getOptions, getNumericOptions } = testCommandMenu(commandMenu);
    commandMenu.addOption('Option 1', mockAction);

    expect(getOptions().size).toBe(1);
    expect(getNumericOptions().get(1)).toBe('Option 1');
  });

  it('should set menu message correctly', () => {
    const { getMenuMessage } = testCommandMenu(commandMenu);
    commandMenu.setMenuMessage('Welcome to the menu');

    expect(getMenuMessage()).toBe('Welcome to the menu');
  });

  it('should set menu question correctly', () => {
    const { getMenuQuestion } = testCommandMenu(commandMenu);
    commandMenu.setMenuQuestion('What would you like to do?');

    expect(getMenuQuestion()).toBe('What would you like to do?');
  });

  it('should set menu function correctly', () => {
    const { getMenuFunction } = testCommandMenu(commandMenu);
    const mockFunction = jest.fn();
    commandMenu.setMenuFunction(mockFunction);

    expect(getMenuFunction()).toBe(mockFunction);
  });

});
