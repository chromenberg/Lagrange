import { Atlas } from "./lib/atlas/AtlasManager.js";
import "./lib/atlas/modules/snowflake/Snowflake.js";
import { SnowflakeNode } from "./lib/atlas/modules/snowflake/Snowflake.js";
import { connectAtlas } from "./lib/atlas/modules/socketing/Socket.js";

// @ts-ignore
console.log(SnowflakeNode({
    workerID: 1,
    workerBits: 10,
    sequenceBits: 12,
    startEpoch: 8597346
}).GenerateID().toString())
const atlas = new Atlas();
connectAtlas(atlas)
// KEYSPACE HAS BEEN CREATED "ATLAS"
// AtlasClient.init()
