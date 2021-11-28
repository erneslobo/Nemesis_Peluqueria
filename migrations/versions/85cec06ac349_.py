"""empty message

Revision ID: 346435ebdeff
Revises: 
Create Date: 2021-11-28 14:48:21.391958

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '346435ebdeff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('muestra',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=False),
    sa.Column('imagen', sa.String(length=250), nullable=False),
    sa.Column('thumbnail', sa.String(length=250), nullable=False),
    sa.Column('categoria', sa.String(length=250), nullable=False),
    sa.Column('activo', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre')
    )
    op.create_table('producto',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=False),
    sa.Column('descripcion', sa.Text(), nullable=False),
    sa.Column('descripcioncorta', sa.Text(), nullable=False),
    sa.Column('precio', sa.Float(), nullable=False),
    sa.Column('tipo', sa.String(length=250), nullable=False),
    sa.Column('categoria', sa.String(length=250), nullable=False),
    sa.Column('imagen', sa.String(length=250), nullable=False),
    sa.Column('thumbnail', sa.String(length=250), nullable=False),
    sa.Column('activo', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre')
    )
    op.create_table('usuario',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=False),
    sa.Column('apellido', sa.String(length=250), nullable=False),
    sa.Column('telefono', sa.String(length=250), nullable=True),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('admin', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favoritos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.Column('muestra_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['muestra_id'], ['muestra.id'], ),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orden',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('usuario_id', sa.Integer(), nullable=False),
    sa.Column('metodo_pago', sa.String(length=250), nullable=False),
    sa.Column('monto_total', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('detalle_orden',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('orden_id', sa.Integer(), nullable=False),
    sa.Column('producto_id', sa.Integer(), nullable=False),
    sa.Column('cantidad', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['orden_id'], ['orden.id'], ),
    sa.ForeignKeyConstraint(['producto_id'], ['producto.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('detalle_orden')
    op.drop_table('orden')
    op.drop_table('favoritos')
    op.drop_table('usuario')
    op.drop_table('producto')
    op.drop_table('muestra')
    # ### end Alembic commands ###
