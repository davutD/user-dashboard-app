import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jConfig } from './neo4j-config.interface';

export const createDriver = async (config: Neo4jConfig) => {
  try {
    const driver: Driver = neo4j.driver(
      `neo4j://neo4j:7687`,
      neo4j.auth.basic(config.username, config.password),
    );

    // const driver: Driver = neo4j.driver(
    //   `neo4j://neo4j:7687`,
    //   neo4j.auth.basic('neo4j', 'mypassword'),
    // );

    await driver.verifyConnectivity({ database: config.database });

    console.log('Neo4j driver created successfully');

    return driver;
  } catch (error) {
    console.log(error);
  }
};
