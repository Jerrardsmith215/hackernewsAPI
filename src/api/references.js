import db from './firebaseConfig';
import { ref } from "firebase/database";

// future references can be created and exported just like this
// eg. export const topStoriesRef = ref(db, '/v0/topStories')
// and then they can be used in future List components to expand functionality
export const newStoriesRef = ref(db, '/v0/newstories');