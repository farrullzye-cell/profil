export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `Firestore Permission Denied: Cannot ${context.operation} on ${context.path}.`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }

  toDetailedString(): string {
    return `Firestore Security Rules Denied Request:
- Operation: ${this.context.operation.toUpperCase()}
- Path: /${this.context.path}
- Request Data: ${
      this.context.requestResourceData
        ? JSON.stringify(this.context.requestResourceData, null, 2)
        : 'N/A'
    }`;
  }
}
