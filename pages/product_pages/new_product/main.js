import { RentPriceSet } from "../../../scripts/blocks/RentPriceSet.js";
const rentPriceSet = new RentPriceSet();

window.delField = (fieldId) => {
  rentPriceSet.delField(fieldId);
}