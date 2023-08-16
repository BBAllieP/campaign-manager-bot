import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
};

//campaign creation command
const CAMPAIGN_COMMAND = {
  name: "create-campaign",
  description: "Create a New Campaign Space",
  options: [
    {
      name: "campaign_name",
      description: "The name of your new campaign",
      type: 3,
    },
  ],
};

const ALL_COMMANDS = [TEST_COMMAND, CAMPAIGN_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
