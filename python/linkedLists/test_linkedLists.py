from linkedList import linkedList
from hypothesis import given, strategies as st


@given(st.integers(1,20))
def test_integers(n):
    ll = linkedList(n)
    stringToTest = "(None)"
    for i in range(n - 1):
        stringToTest = f"{stringToTest} --> (None)"
    assert str(ll) == stringToTest
