from os import urandom

def create_random_id() -> int:
    return int.from_bytes(urandom(4))