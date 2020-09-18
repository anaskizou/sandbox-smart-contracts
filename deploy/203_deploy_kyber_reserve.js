const configParams = require("../data/kyberReserve/apr_input");

module.exports = async ({getChainId, getNamedAccounts, deployments}) => {
  const chainId = await getChainId();
  if (chainId === "31337") {
    return;
  }
  let pricingOperator;

  const {deploy, execute, log} = deployments;
  const {deployer} = await getNamedAccounts();
  const networkAddress = configParams[chainId].kyberNetworkAddress;
  parseInput(configParams[chainId]);
  deployerAddress = deployer;
  const sandContract = await deployments.get("Sand");
  log("deploying LiquidityConversionRates...");

  let lcr = await deploy("LiquidityConversionRates", {
    from: deployer,
    args: [deployerAddress, sandContract.address],
    log: true,
  });
  log("deploying KyberReserve...");
  await deploy("KyberReserve", {
    from: deployer,
    args: [networkAddress, lcr.address, deployerAddress],
    log: true,
  });

  function parseInput(jsonInput) {
    whitelistedAddresses = jsonInput["whitelistedAddresses"];
    reserveAdmin = jsonInput["reserveAdmin"];
    pricingOperator = jsonInput["pricingOperator"];
    reserveOperators = jsonInput["reserveOperators"];
    weiDepositAmount = jsonInput["weiDepositAmount"];
    sandDepositAmount = jsonInput["sandDepositAmount"];
  }
};

module.exports.tags = ["KyberReserve"];
