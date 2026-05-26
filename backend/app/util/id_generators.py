from os import urandom

def create_random_id() -> int:
    #return int.from_bytes(urandom(4)) - (2**(4*8-1))
    return int.from_bytes(urandom(4)) - 2147483647

def create_session_id() -> str:
    """
    Creates a randomized session id
    """
    symbols = '123456789abcdefghijklmnopqrstuvwxyz'
    id = ''
    for _ in range(5):
        id += symbols[int(int.from_bytes(urandom(4)) / 2**32 * len(symbols))]

    return id