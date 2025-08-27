def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        memo[n] = n
    else:
        memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]



import time

def benchmark(func, n):
    start = time.time()
    result = func(n)
    duration = time.time() - start
    print(f"{func.__name__}({n}) = {result} | Time: {duration:.4f}s")

# Test for n = 30
benchmark(fib_naive, 30)
benchmark(fib_memo, 30)