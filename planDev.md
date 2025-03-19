# Plan for Implementing User-based Multi-tenancy in Hexabot

Based on the updated requirements, we'll implement a simplified multi-tenant approach where each user in the Hexabot system represents their own tenant, meaning each user owns and manages their own set of chatbots.

## 1. Authentication Strategy

### Use Existing Hexabot Authentication

- Continue using Hexabot's native authentication system
- No integration with CellCast authentication at this stage
- Each user will log in directly to the Hexabot interface
- User ID will serve as the tenant identifier

## 2. User-based Multi-Tenant Data Isolation

- Modify Hexabot's data models to associate all resources with user ID
- User ID will function as the tenant identifier
- Ensure all data access queries include user ID filtering
- Each chatbot created belongs to a specific user
- Users can only access/modify chatbots they created

## 3. User Experience Flow

1. User logs into Hexabot directly using Hexabot authentication
2. Upon login, user only sees their own chatbots and resources
3. Any new chatbot created is automatically associated with the current user
4. Complete data isolation between different users

## 4. Implementation Steps

### Data Model Changes:

- Add user ID field to all relevant database models (chatbots, conversations, etc.)
- Update database schemas and relationships
- Ensure all new resources are created with the current user's ID
- Update access control to filter by user ID

### Authentication Flow:

- Keep the existing Hexabot authentication system
- Ensure user context is maintained throughout the application
- Pass user ID to all data access operations

### Security Considerations:

- Implement strict data filtering based on user ID
- Set up proper database indexing for user ID fields
- Ensure API endpoints validate user ownership of resources
- Apply audit logging for all resource creation and access

## 5. Affected Files

### Backend (API):

#### Schema Files:

- `/api/src/chat/schemas/block.schema.ts` - Add createdBy field to blocks
- `/api/src/chat/schemas/category.schema.ts` - Add createdBy field to categories
- `/api/src/chat/schemas/context-var.schema.ts` - Add tenant isolation
- `/api/src/chat/schemas/label.schema.ts` - Add createdBy or tenant field
- `/api/src/chat/schemas/subscriber.schema.ts` - Update to include tenant context
- `/api/src/chat/schemas/message.schema.ts` - Ensure proper tenant isolation
- `/api/src/cms/schemas/content.schema.ts` - Add tenant or createdBy field
- `/api/src/cms/schemas/content-type.schema.ts` - Add tenant isolation
- `/api/src/cms/schemas/menu.schema.ts` - Add tenant context
- `/api/src/nlp/schemas/nlp-entity.schema.ts` - Add tenant isolation
- `/api/src/nlp/schemas/nlp-value.schema.ts` - Add tenant isolation
- `/api/src/setting/schemas/setting.schema.ts` - Make settings tenant-specific
- `/api/src/i18n/schemas/language.schema.ts` - Consider tenant-specific language settings
- `/api/src/i18n/schemas/translation.schema.ts` - Consider tenant-specific translations

#### Repository Files:

- Repository implementations for all the above schemas to enforce tenant filtering
  - Add tenant-based filtering in query methods
  - Update create operations to include tenant ID

#### Service Files:

- Service implementations to maintain tenant context
- Update CRUD operations to respect tenant boundaries

#### Controllers:

- Update controllers to enforce tenant authorization rules
- Ensure user can only access their own resources

### Frontend:

- `/frontend/src/services/types.ts` - Update entity types to handle tenant context
- `/frontend/src/types/base.types.ts` - Add tenant-related interfaces
- `/frontend/src/types/model.types.ts` - Update model interfaces
- `/frontend/src/services/entities.ts` - Update entity definitions with tenant awareness
- API service calls to handle tenant context
- Components that display/manage resources to respect tenant boundaries

### New Files to Create:

#### Backend:

- `/api/src/utils/decorators/tenant-resource.decorator.ts` - Decorator for tenant-based resources
- `/api/src/utils/guards/tenant-resource.guard.ts` - Guard to enforce tenant-level access control
- `/api/src/utils/interceptors/tenant-context.interceptor.ts` - Interceptor to inject tenant context

#### Frontend:

- `/frontend/src/contexts/tenant-context.tsx` - Context provider for tenant information
- `/frontend/src/hooks/useTenantContext.ts` - Hook to access tenant context

## 6. Database Migration

A migration script will be needed to:

1. Update existing schema structures
2. Add tenant fields to existing records
3. Set up proper indexing for tenant-based queries
4. Ensure data integrity during the transition
