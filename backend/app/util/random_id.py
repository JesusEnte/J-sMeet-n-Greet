from os import urandom

def create_random_id() -> int:
    return int.from_bytes(urandom(4)) - 2147483647
    #return int.from_bytes(urandom(4)) - (2**(4*8) - 1)