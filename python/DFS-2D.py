grid = [
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, 0]
]

rows, cols = len(grid), len(grid[0])
visited = set()

def dfs(r, c):
    if (r < 0 or r >= rows or c < 0 or c >= cols):
        return
    if grid[r][c] == 1 or (r, c) in visited:
        return
    
    visited.add((r, c))
    
    directions = [(0,1),(1,0),(-1,0),(0,-1)]
    for dr, dc in directions:
        dfs(r+dr, c+dc)
