-- AlterTable
ALTER TABLE "User"
ADD COLUMN "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "authVersion" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "deletedAt" TIMESTAMP(3);

UPDATE "User"
SET "status" = CASE WHEN "active" = true THEN 'active' ELSE 'blocked' END;

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "authVersion" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UserInvitation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInvitation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AccessProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProfilePermission" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "ProfilePermission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PermissionAudit" (
    "id" SERIAL NOT NULL,
    "actorId" INTEGER,
    "targetUserId" INTEGER,
    "action" TEXT NOT NULL,
    "reason" TEXT,
    "before" JSONB,
    "after" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermissionAudit_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "IdempotencyRecord" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "requestHash" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "response" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdempotencyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_refreshTokenHash_key" ON "AuthSession"("refreshTokenHash");
CREATE INDEX "AuthSession_userId_idx" ON "AuthSession"("userId");
CREATE INDEX "AuthSession_expiresAt_idx" ON "AuthSession"("expiresAt");
CREATE UNIQUE INDEX "UserInvitation_tokenHash_key" ON "UserInvitation"("tokenHash");
CREATE INDEX "UserInvitation_userId_idx" ON "UserInvitation"("userId");
CREATE INDEX "UserInvitation_expiresAt_idx" ON "UserInvitation"("expiresAt");
CREATE UNIQUE INDEX "AccessProfile_name_key" ON "AccessProfile"("name");
CREATE UNIQUE INDEX "ProfilePermission_profileId_permission_key" ON "ProfilePermission"("profileId", "permission");
CREATE INDEX "ProfilePermission_permission_idx" ON "ProfilePermission"("permission");
CREATE INDEX "PermissionAudit_actorId_idx" ON "PermissionAudit"("actorId");
CREATE INDEX "PermissionAudit_targetUserId_idx" ON "PermissionAudit"("targetUserId");
CREATE INDEX "PermissionAudit_action_idx" ON "PermissionAudit"("action");
CREATE INDEX "PermissionAudit_createdAt_idx" ON "PermissionAudit"("createdAt");
CREATE UNIQUE INDEX "IdempotencyRecord_key_key" ON "IdempotencyRecord"("key");
CREATE INDEX "IdempotencyRecord_expiresAt_idx" ON "IdempotencyRecord"("expiresAt");

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserInvitation" ADD CONSTRAINT "UserInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProfilePermission" ADD CONSTRAINT "ProfilePermission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "AccessProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PermissionAudit" ADD CONSTRAINT "PermissionAudit_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PermissionAudit" ADD CONSTRAINT "PermissionAudit_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed access profiles and their default permission matrix.
INSERT INTO "AccessProfile" ("name", "description", "version", "updatedAt")
VALUES
  ('admin', 'Acesso administrativo completo, incluindo usuários, perfis e ações destrutivas.', 1, CURRENT_TIMESTAMP),
  ('qa', 'Acesso operacional para criar e atualizar dados sem gerenciar identidades ou exclusões críticas.', 1, CURRENT_TIMESTAMP),
  ('viewer', 'Acesso somente leitura aos módulos operacionais e relatórios.', 1, CURRENT_TIMESTAMP);

INSERT INTO "ProfilePermission" ("profileId", "permission")
SELECT "id", '*' FROM "AccessProfile" WHERE "name" = 'admin';

INSERT INTO "ProfilePermission" ("profileId", "permission")
SELECT profile."id", permission.name
FROM "AccessProfile" profile
CROSS JOIN (
  VALUES
    ('clients:read'), ('clients:write'),
    ('contracts:read'), ('contracts:write'),
    ('products:read'), ('products:write'),
    ('cart:read'), ('cart:write'),
    ('orders:read'), ('orders:write'),
    ('payments:read'), ('payments:write'),
    ('coupons:read'), ('coupons:write'),
    ('evidences:read'), ('evidences:write'),
    ('reports:read'), ('reports:export')
) AS permission(name)
WHERE profile."name" = 'qa';

INSERT INTO "ProfilePermission" ("profileId", "permission")
SELECT profile."id", permission.name
FROM "AccessProfile" profile
CROSS JOIN (
  VALUES
    ('clients:read'), ('contracts:read'), ('products:read'),
    ('cart:read'), ('orders:read'), ('payments:read'),
    ('coupons:read'), ('evidences:read'),
    ('reports:read'), ('reports:export')
) AS permission(name)
WHERE profile."name" = 'viewer';
