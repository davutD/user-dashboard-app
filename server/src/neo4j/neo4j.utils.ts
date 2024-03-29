import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jConfig } from './neo4j-config.interface';

export const createDriver = async (config: Neo4jConfig) => {
  try {
    const driver: Driver = neo4j.driver(
      `${config.scheme}://${config.host}:${config.port}`,
      neo4j.auth.basic(config.username, config.password),
    );
    await driver.verifyConnectivity({ database: config.database });

    console.log('Neo4j driver created successfully');

    return driver;
  } catch (error) {
    console.log(error);
  }
};
