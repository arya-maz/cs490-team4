import json
from uuid import uuid4


class TempStorage:
    def __init__(self, storage_file="storage.json"):
        self.storage_file = storage_file
        self.__storage = self.__load_storage()

    def __generate_uid(self) -> str:
        return str(uuid4())

    def __load_storage(self) -> dict:
        try:
            with open(self.storage_file, "r") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}

    def __save_storage(self):
        with open(self.storage_file, "w") as f:
            json.dump(self.__storage, f)

    def create(self, to_save: dict) -> str:
        session_uid = self.__generate_uid()
        self.__storage[session_uid] = to_save
        self.__save_storage()
        return session_uid

    def read(self, session_uid: str) -> dict:
        return self.__storage.get(session_uid)

    def update_storage(self, session_uid: str, updates: dict):
        if session_uid in self.__storage:
            self.__storage[session_uid].update(updates)
            self.__save_storage()
            return session_uid
        return False

    def delete(self, session_uid: str) -> bool:
        if session_uid in self.__storage:
            del self.__storage[session_uid]
            self.__save_storage()
            return True
        return False

