import db from './firebaseConfig';
import { limitToFirst, ref, query } from "firebase/database";

// references
export const newStoriesRef = query(ref(db, '/v0/newstories'), limitToFirst(100));
export const itemRef = ref(db, `/v0/item`);