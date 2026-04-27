# Savoney Impact Security Spec

## Data Invariants
1. A portfolio must belong to a valid authenticated user.
2. The `userId` in the document must match the authenticating user's `uid`.
3. Allocations weights must sum (ideally) to 1, though for simplicity in validation we check they are numbers and positive.
4. Timestamps must be server-generated.

## Dirty Dozen Payloads (Expected to Fail)
1. Write portfolio for another user: `{ userId: "other_user", ... }`
2. Update `userId` of an existing portfolio.
3. Create portfolio without `userId`.
4. Create portfolio with malicious string in ticker.
5. Create portfolio with negative budget.
6. Create project as non-admin.
7. Update project as non-admin.
8. Delete project as non-admin.
9. List all users' portfolios (blanket read).
10. Update portfolio `createdAt`.
11. Inject 1MB string into portfolio `name`.
12. Set `sroiScore` > 1 if we had a range check (though we usually check basic types first).

## Test Runner
(Implemented in firestore.rules.test.ts)
