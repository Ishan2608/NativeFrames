// Project Name: NativeFrames
import { Client, Account, ID, Avatars, Databases, Storage, Query } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ishan26.nativeframes',
    projectId: '66a735cf002ec6d65359',
    databaseId: "66a7363e0031964dd1e3",
    userCollectionId: "66a7364e001f641a973c",
    videoCollectionId: "66a73660000877e7d036",
    storageId: "66a7367100278c855e31"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your AppWrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {

    try{
        const newAccount = await account.create(ID.unique(), email, password, username);

        if(!newAccount) { throw Error };

        const avatarUrl = avatars.getInitials(username);
        // console.log("Avatar Created");

        await signIn(email, password);
        console.log("Sign In done");

        const newUser = await databases.createDocument(
            appWriteConfig.databaseId, 
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            },
        )
        console.log("New User Created");

        return newUser;

    } catch (error){
        console.log(error);
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);
        session.then(function (response) {
            console.log("Sign in Success. Response is:")
            console.log(response); // Success
        }, function (error) {
            console.log("Sign in Failed. Response is:")
            console.log(error); // Failure
        });
    } catch (error){
        throw new Error(error);
    }
}

// Get Account
export async function getAccount() {
    try {
      const currentAccount = await account.get();
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
}

// Get current logged in User
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) {throw Error};

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId, 
            appWriteConfig.userCollectionId, 
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error){
        throw new Error(error);
    }
}

// delete the session to logout the user
export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw new Error(error.message);
    }
}
