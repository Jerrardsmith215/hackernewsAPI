import db from './firebaseConfig';
import { ref } from "firebase/database";

// references
export const newStoriesRef = ref(db, '/v0/newstories');
export const itemRef = ref(db, `/v0/item`);